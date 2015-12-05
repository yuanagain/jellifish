# Rushy Panchal
# Jelli.fish environment setup
# To run, execute the following in your terminal:
# ./setup-osx.sh ~/.bash_profile

# NOTE: this setup script assumes you have Home brew installed
# If you do not, install it with the instructions found on brew.sh

# Configuration here
SHELL_PATH=$1

# Install pyenv to manage Python versions
brew install pyenv

echo 'export PYENV_ROOT="$HOME/.pyenv"' >> $SHELL_PATH
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> $SHELL_PATH
echo 'eval "$(pyenv init -)"' >> $SHELL_PATH

# Install Python 3.5
pyenv install 3.5.0
pyenv rehash
