import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment-timezone";
import PlanningService from "@/services/planningService";
import Modal from "react-modal";
import { useForm, SubmitHandler } from "react-hook-form";
import { ICarsitter } from "@/interfaces/carsitter";
import { IPlanning } from "@/interfaces/planning";
import carsitterService from "@/services/carsitterService";

moment.tz.setDefault("Europe/Paris");
const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
  id?: string;
  carId?: string;
}

function Planning() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [carsitters, setCarsitters] = useState<ICarsitter[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IPlanning>();

  const fetchCarsittersAndEvents = async () => {
    try {
      const [planningsResponse, carsittersResponse] = await Promise.all([
        PlanningService.getAllSlots(),
        carsitterService.getAllCarsitters(),
      ]);

      const planningsData = planningsResponse.data;
      const carsittersData = carsittersResponse.data;

      console.log("planningsData:", planningsData);
      console.log("carsittersData:", carsittersData);

      const formattedEvents = planningsData.map((planning) => {
        const carsitter = carsittersData.find((c) => c._id === planning.carsitterId._id);

        return {
          id: planning._id,
          title:
            carsitter && carsitter.firstname && carsitter.lastname
              ? `${carsitter.firstname} ${carsitter.lastname}`
              : "Non assigné",
          start: new Date(planning.startTime),
          end: new Date(planning.endTime),
        };
      });

      setCarsitters(carsittersData);
      setEvents(formattedEvents);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const initialEvents: Event[] = [];
    setEvents(initialEvents);
    fetchCarsittersAndEvents();
  }, []);

  const handleSelectSlot = (slotInfo: any) => {
    setSelectedEvent({
      title: "",
      start: slotInfo.start,
      end: slotInfo.end,
    });
    setModalIsOpen(true);
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const onSubmit: SubmitHandler<IPlanning> = async (formData) => {
    if (selectedEvent) {
      const planningData: IPlanning = {
        _id: selectedEvent.id || "",
        carsitterId: formData.carsitterId,
        startTime: formData.startTime,
        endTime: formData.endTime,
      };

      if (selectedEvent.id) {
        await PlanningService.updateSlot(selectedEvent.id, planningData);
      } else {
        await PlanningService.createSlot(planningData);
      }

      setModalIsOpen(false);
      fetchCarsittersAndEvents(); // Rafraîchir les événements après avoir soumis le formulaire
    }
  };

  const handleDelete = async () => {
    if (selectedEvent && selectedEvent.id) {
      await PlanningService.deleteSlot(selectedEvent.id);
      setModalIsOpen(false);
      fetchCarsittersAndEvents(); // Rafraîchir les événements après avoir supprimé un créneau
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div>
        <h1>Planning des Carsitters</h1>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700, width: 800 }}
          selectable={true}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
        />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Affecter ou Supprimer un Carsitter"
        >
          <h2>Affecter ou Supprimer un Carsitter</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              Carsitter :
              <select {...register("carsitterId", { required: true })}>
                {carsitters.map((carsitter) => (
                  <option key={carsitter._id} value={carsitter._id}>
                    {`${carsitter.firstname} ${carsitter.lastname}`}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Début du créneau :
              <input
                type="datetime-local"
                {...register("startTime", { required: true })}
                disabled={!!selectedEvent?.id}
              />
            </label>
            <label>
              Fin du créneau
              <input
                type="datetime-local"
                {...register("endTime", { required: true })}
                disabled={!!selectedEvent?.id}
              />
            </label>
            <button type="submit">Affecter</button>
            {selectedEvent && selectedEvent.id && (
              <button type="button" onClick={handleDelete}>
                Supprimer
              </button>
            )}
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default Planning;
