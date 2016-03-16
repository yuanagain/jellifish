#!/bin/bash
# Rushy Panchal
# ansible.sh
# Install Ansible and provision the server

# Check if Ansible is already installed...
if hash ansible 2>/dev/null; then
	# Ansible is already installed on the system
	echo "Ansible already installed; skipping installation...";
else
	# Install Ansible because it exists on the system
	echo "Ansible not installed; installing now..."
	sudo apt-get install -y software-properties-common
	sudo apt-add-repository ppa:ansible/ansible
	sudo apt-get update
	sudo apt-get install -y ansible
fi

# Run the Ansible provisioner
echo "Provisioning via Ansible..."
cd $1
sudo ENV=$3 ansible-playbook $2
