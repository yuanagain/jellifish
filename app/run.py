# Rushy Panchal
# jellifish
# app/run.py

import config
import app

def main():
	'''
	Create the server and run it
	'''
	server = app.Application()

	if config.DEV_MODE:
		server.run()

if __name__ == '__main__':
	main()

