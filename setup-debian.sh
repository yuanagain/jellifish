# Rushy Panchal
# Jelli.fish environment setup (for Debian-based systems)
# To run, execute the following in your terminal:
# ./setup-debian.sh {SHELL PROFILE LOCATION}
# For Bash, this is ~/.bashrc

# Configuration here
SHELL_PATH=$1
if [ $# -eq 0 ]; then
	SHELL_PATH="~/.bashrc"
fi

# Install pyenv to manage Python versions
sudo apt-get install git python-pip make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev

git clone https://github.com/yyuu/pyenv.git ~/.pyenv

echo 'export PYENV_ROOT="$HOME/.pyenv"' >> $SHELL_PATH
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> $SHELL_PATH
echo 'eval "$(pyenv init -)"' >> $SHELL_PATH

# Install Python 3.5
pyenv install 3.5.0
pyenv rehash

pyenv local 3.5.0

# Setup the virtual environment
sudo pip install virtualenv
virtualenv --python=python env
