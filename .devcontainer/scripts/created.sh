if [ ! -f ./.env.local ]; then
	cp .devcontainer/container.env ./.env.local
else
	echo "env file already exist"
fi
cat << "EOF"

╔══╗─╔═══╗╔═══╗╔════╗╔═══╗
║╔╗║─║╔═╗║║╔═╗║║╔╗╔╗║║╔═╗║
║╚╝╚╗║║─║║║╚═╝║╚╝║║╚╝║╚═╝║
║╔═╗║║╚═╝║║╔╗╔╝──║║──║╔╗╔╝
║╚═╝║║╔═╗║║║║╚╗──║║──║║║╚╗
╚═══╝╚╝─╚╝╚╝╚═╝──╚╝──╚╝╚═╝

EOF
echo "Welcome Bartr developer! Go forth and code :)"

echo "Configuring SSH Keys & Git"
if [ -f ~/.ssh/id_rsa ]; then
	ssh-keyscan -H github.com >> ~/.ssh/known_hosts
	ssh git@github.com
	git config --global --add safe.directory /workspace
else
	echo "WARNING host provided no id_rsa..."
fi
