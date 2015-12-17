# Rushy Panchal
# Jelli.fish environment setup (for OS X)
# To run, execute the following in your terminal:
# ./setup-osx.sh {SHELL PROFILE LOCATION}
# For Bash, your shell profile is located at ~/.bash_profile

# NOTE: this setup script assumes you have Home brew installed
# If you do not, install it with the instructions found on brew.sh

# Configuration here
SHELL_PATH=$1
if [ $# -eq 0 ]; then
	SHELL_PATH="~/.bash_profile"
fi

# Install pyenv to manage Python versions
brew install pyenv

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
