FROM captainhowdy/cm-library-main:0.2

RUN apk add git

RUN mkdir -p /usr/local/lib/cm
RUN mkdir -p /usr/local/lib/cm/cm-dungeon
WORKDIR /usr/local/lib/cm/cm-dungeon/
CMD /bin/sh -c "[ ! -d 'node_modules' ] && npm install; exec tsc -w"

