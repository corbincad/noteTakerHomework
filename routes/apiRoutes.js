const router = require('express').Router();
const call = require("../db/call")


router.get("/notes", function(req, res){
    call
    .getNotes()
    .then(notes => res.json(notes))
    .catch (err => res.status(500).json(err))
})

router.post("/notes", (req, res =>{
    call
    .addNotes()
    .then((note) => res.json(note))
    .catch (err => res.status(500).json(err))
}))

router.delete("/notes/:id", function(req, res){
    call
    .removeNote(req.params.id)
    .then(() => res.json({ok: true}))
    .catch (err => res.status(500).json(err))
})

module.export = router;
