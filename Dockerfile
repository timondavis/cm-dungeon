FROM captainhowdy/cm-library-main

RUN mkdir -p /usr/local/lib/cm
COPY ./ /usr/local/lib/cm/cm-dungeon/
WORKDIR /usr/local/lib/cm/cm-dungeon/
CMD /bin/sh -c "yarn install ; exec tsc -w"
