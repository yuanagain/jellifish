# Rushy Panchal
# Vagrantfile

# -*- mode: ruby -*-
# vi: set ft=ruby :

# Required Vagrant version
Vagrant.require_version ">= 1.8.0"

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version.
Vagrant.configure(2) do |config|
  # see https://docs.vagrantup.com for reference.

  ### BOX CONFIGURATION ###

  # The starting point for the Vagrant configuration (operating system)
  config.vm.box = "ubuntu/trusty64"

  # The box version is restricted so that we do not run into incompatabilities
  config.vm.box_version = "= 20160208.0.0"
  config.vm.box_check_update = false # do not check for box updates

  # Accessing "localhost:8080" (on the host) will access port 80 on the guest machine.
  config.vm.network "forwarded_port", guest: 80, host: 8080

  ### PROVISIONING ###

  # Upload public key to server
  config.vm.provision :file do |file|
    file.source = ENV.fetch("SSH_KEY", "~/.ssh/id_rsa.pub")
    file.destination = "/var/tmp/host_ssh.key"
  end

  # Provision the VM with Ansible after installing it
  config.vm.provision :shell do |shell|
    shell.path = "server/scripts/ansible.sh"
    shell.upload_path = "/vagrant/ansible.sh" # Upload to same folder as server.yml

    # Ansible configuration file
    shell.args = [ENV.fetch("ENV", "development"), "/vagrant", "server/server.yml", "../config.yml"]
  end

  # this configuration does not yet work because of an issue with Vagrant
  # and installing Ansible.
  # config.vm.provision :ansible_local do |ansible|
  #     ansible.install = true
  #     ansible.version = "latest"
  #     ansible.sudo = true
  #     ansible.playbook = "server.yml"
  # end

  ### PROVIDERS ###

  # Ensure that virtualbox is the first provider, thus making it the default provider.
  config.vm.provider :virtualbox

  # AWS (as a provider) configuration
  config.vm.provider :aws do |aws, override|
    # AWS credentials
    aws.access_key_id = ENV.fetch("AWS_KEY", nil)
    aws.secret_access_key = ENV.fetch("AWS_SECRET", nil)

    # The box is a "mock" box, in that it does not contain much data for actually
    # provisioning and imaging the VM. Instead, it allows us to use AWS
    # for a provider.
    override.vm.box = "panchr/aws-trusty64"
    override.vm.box_version = ">=0.1.0"

    # This AMI (Amazon Machine Image) is Ubuntu's Trusty64 operating system
    # on an 8 GB image.
    aws.ami = "ami-fce3c696"

    # Elastic IP to associate with the EC2 instance
    # aws.elastic_ip = "eipalloc-05d7e061"
    # Elastic IP configuration is not working currently

    # Specific EC2 configuration
    aws.instance_type = "t2.small"
    aws.region = "us-east-1"
    aws.tags = {:name => "jellifish"}
    aws.security_groups = ["HTTP(S) + SSH"]

    # Only stop the VM when running "shutdown" on the server
    aws.terminate_on_shutdown = false

    # AWS Keypair to use when SSHing into the server
    aws.keypair_name = "aws_key"

    override.ssh.username = "ubuntu"
    override.ssh.private_key_path = ENV.fetch("SSH_KEY", "~/.ssh/aws_key.pem")
  end
end
