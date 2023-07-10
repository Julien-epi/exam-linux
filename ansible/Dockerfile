# Dockerfile
FROM python:3

RUN pip install ansible

WORKDIR /ansible

# Copy your Ansible playbook into the container
COPY ./playbook.yml .

# Run the playbook when building the image
RUN ansible-playbook playbook.yml

CMD ["tail", "-f", "/dev/null"]
