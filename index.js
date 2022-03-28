const yargs = require("yargs")
const pkg = require("./package.json")

const { addNote, getNotes, removeNote } = require('./notes.controller')

yargs.version(pkg.version)

yargs.command({
    command: 'add',
    describe: 'Add new note to list',
    title: {
        type: 'string',
        describe: 'Note title',
        demandOption: true
    },
    handler({ title }) {
        addNote(title)
    }
})

yargs.command({
    command: 'list',
    describe: 'Print all notes',
    async handler() {
        const notes = await getNotes()
        if (notes.length > 0) {
            notes.forEach((elem) => console.log(elem.id, elem.title))
        }
    }
})

yargs.command( {
    command: 'remove',
    describe: 'remove note by id',
    id: {
        type: 'string',
        describe: 'Note id',
        demandOption: true
    },
    handler({id}) {
        removeNote(id)
    }
})

yargs.parse()