# {{ NAME }}
# Rushy Panchal
# configure.py
# Server bootstrap script for configuration

DEPLOY_SETTINGS = {{ DEPLOY_SETTINGS }}

import subprocess
import os

def main():
	'''Main process'''
	for fileName in DEPLOY_SETTINGS["configuration_files"]:
		with open(fileName, "w") as config_file:
			config_file.write(DEPLOY_SETTINGS["configuration_file_data"][fileName])

	if os.path.exists("init"):
		subprocess.call("chmod +x init && ./init", shell = True)

if __name__ == '__main__':
	main()
