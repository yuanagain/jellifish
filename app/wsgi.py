# Rushy Panchal
# jellifish
# app/wsgi.py

from app import Application

application = Application.getServer()

if __name__ == '__main__':
	application.run()
