echo "Please enter your name:"; read USER
echo "[$(date)] ${USER} joined the chat" >> chat.log
echo "[$(date)] Welcome to the chat ${USER}!"
tail -n 0 -f chat.log --pid=$$ | grep --line-buffered -v "] ${USER}>" &
while read MSG; do echo "[$(date)] ${USER}> ${MSG}" >> chat.log; done