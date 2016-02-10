#!/bin/bash
# Rushy Panchal
# ansible.sh
# Install Ansible and provision the server

# Install Ansible via apt
echo "Installing Ansible..."
sudo apt-get install -y software-properties-common
sudo apt-add-repository ppa:ansible/ansible
sudo apt-get update
sudo apt-get install -y ansible

# Run the Ansible provisioner
echo "Provisioning via Ansible..."
sudo ansible-playbook $1
