const express = require('express');
const router= express.Router()
const models=require("../models")
const Page=models.Page
const User=models.User
const {addPage,main}=require("../views")
module.exports=router





router.get("/", (req, res, next) => {

res.send(main())
  // next()
})

router.post("/", async(req, res, next) => {
  // add definitions for `title` and `content`
  const page =await new Page({
    title: req.body.title,
    content: req.body.content
  });

  console.log("page",page)

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error) }


});
// res.json(req.body)
  // next()
// })

router.get("/add", (req, res, next) => {
res.send(addPage())
  // next()
})
