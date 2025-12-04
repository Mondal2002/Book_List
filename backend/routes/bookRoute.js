import express from "express";
import {book, User, admin} from "../models/bookModel.js";
const router=express.Router();
import cookieParser from "cookie-parser"
import { hash } from "bcrypt";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

router.get('/test',(req,res)=>{
  res.send('Backend connected')
})
const checkToken=((req,res,next)=> {
  try{
    const token=req.cookies.token;
    if(!token) return res.sendStatus(401);
    const user=jwt.verify(req.cookies.token,"secret")
    req.user=user;
    next();
  }
  catch(err){
    console.error(err);
    return res.status(500).json({ error: err.message });
  }

})
const checkAdmin=(async(req,res,next)=>{
  try{
    const token=req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token, unauthorized" });
    }

    const decoded = jwt.verify(token, "secret");
    const MrAdmin=await admin.findOne({_id:decoded.id});
    if(!MrAdmin){
      return res.status(404).json({message:"Access Unauthorised"})}
      req.admin = MrAdmin;
    next();
  }
  catch(err){
      console.error(err);
      return res.status(500).json({error:err.message });
    }
  }

)
const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};
router.get("/logout",checkToken, (req,res)=>{
  console.log('logging out...')
  res.clearCookie("token");
  console.log("Logout Successful");
  return res.status(200).json({ message: "Logged out successfully" });
})

router.post('/books',checkToken,async(req,res)=>{
    try{
        const NewBook=new book({
        Book_name:req.body.Book_name,
        Author: req.body.Author,
        Published_Year:req.body.Published_Year

    })
    const saveBook=await NewBook.save();
    res.send(saveBook)
    }
    catch(err){
        res.status(500).json({ error: err.message });        
    }
})

router.get('/booklist',checkToken,async(req,res)=>{
    const Use = await book.find();
    res.send(Use);
})

router.get('/:id',async(req,res)=>{
  const id=req.params.id
    const User = await book.findById(id);
    res.send(User);
})

router.put('/Update/:id',checkToken,async(req,res)=>{
  const id =req.params.id;
  try{
    const updateBook= await book.findByIdAndUpdate(id,req.body);
    if(!updateBook)
    {
      return res.status(404).json({message:"book not found"});
    }
    return res.status(200).send({ message: "Book Updated Successfully" });
  }
  catch(err){
    res.status(500).json({ error: err.message });
  }
})

router.delete("/book/:id",checkToken, async (req, res) => {
  const id = req.params.id;   // ✅ Correct

  console.log(id,typeof(id))
  try {
    const deleteBook = await book.findByIdAndDelete(id);

    if (!deleteBook) {
      return res.status(404).send({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const convert = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log(hash);
  return hash;
};
router.post('/books/login', async (req, res) => {
  try {
    const { loginId, password } = req.body;

    const user = await User.findOne({ loginId });

    if (!user) {
      return res.status(401).json({ error: "Invalid loginId" });
    }

    if(!user.IsActive){
      console.log("user is no longer active");
      return res.status(403).json({ error: "Account Deactivated" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch ) {
      console.log("Invalid password");
      return res.status(401).json({ error: "Invalid password" });
    }

    console.log("Password matched");

    const token = jwt.sign(
      { id:user._id,loginId: user.loginId ,role:"user" },
      "secret",
      { expiresIn: "1h" }
    );
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      });

    return res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }

});
router.post('/books/register',async(req,res)=>{
  const hashedPassword=await convert(req.body.password);
    try{
        const Newuser=new User({
        loginId:req.body.loginId,
        password:hashedPassword,
        IsActive:true

    })
    const saveUser=await Newuser.save();
    res.send(saveUser)
    console.log(password)
    }
    catch(err){
        res.status(500).json({ error: err.message });        
    }
})
router.post('/forgot/books/',async(req,res)=>
{
    const Users = await User.findOne({loginId:req.body.loginId});
    if (!Users) {
        return res.status(404).json({ message: "User not found" });
      }
    console.log(Users._id);
    res.send(Users._id);
})
router.put('/forgotPassword/:id',async(req,res)=>{
  const id=req.params.id;
  const newHashedPassword=await convert(req.body.password);
  try{
    const update={
      password:newHashedPassword,
      IsActive:true
    }
    const updateUser=await User.findByIdAndUpdate(id,update);
    if(!updateUser)
    {
      return res.status(404).json({message:"User not found"});
    }
    return res.status(200).send({ message: "User Updated Successfully" });
  }catch{
    res.status(500).json({ error: err.message });
  }
})
router.put('/deactivate/acc', async (req, res) => {
  try {
    // 1️⃣ Get token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Token not found!" });
    }

    // 2️⃣ Verify & decode token
    const decoded = jwt.verify(token, "secret");

    // decoded = { id: "...", loginId: "...", iat:..., exp:... }

    const userId = decoded.id; // Extract user id

    if (!userId) {
      return res.status(400).json({ error: "Invalid token!" });
    }

    // 3️⃣ Update user status
    const updateStatus = await User.findByIdAndUpdate(
      userId,
      { IsActive: false },
      { new: true } // returns updated document
    );

    if (!updateStatus) {
      return res.status(404).json({ message: "User not found!" });
    }

    // 4️⃣ Remove token cookie
    res.clearCookie("token");

    return res.status(200).json({ message: "Account deactivated successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});
router.post('/admin/new',async(req,res)=>
{
    const hashedPassword=await convert(req.body.password);
    try{
        const NewAdmin=new admin({
        adminId:req.body.adminId,
        password:hashedPassword,
        IsActive:true

    })
    const saveAdmin=await NewAdmin.save();
    res.send(saveAdmin)
    console.log(password)
    }
    catch(err){
        res.status(500).json({ error: err.message });        
    }
})
router.post('/admin/login', async (req, res) => {
  try {
    const { adminId, password } = req.body;

    const admins = await admin.findOne({ adminId });

    if (!admins) {
      console.log("cannot find admin");
      return res.status(401).json({ error: "Invalid adminId" });
    }

    if(!admins.IsActive){
      console.log("user is no longer active");
      return res.status(403).json({ error: "Account Deactivated" });
    }

    const isMatch = await bcrypt.compare(password, admins.password);

    if (!isMatch ) {
      console.log("Invalid password");
      return res.status(401).json({ error: "Invalid password" });
    }

    console.log("Password matched");

    const token = jwt.sign(
      { id:admins._id,adminId: admins.adminId ,role:"admin" },
      "secret",
      { expiresIn: "1h" }
    );
        res.cookie("token", token);

    return res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }

});
router.get('/admin/allUsers',checkAdmin,async(req,res)=>{
  const alluser=await User.find();
  res.send(alluser);
})
router.get('/admin/alladmins',async(req,res)=>{
  const alluser=await admin.find();
  res.send(alluser);
})
router.delete('/admin/DeleteUser/:id',checkToken,requireAdmin,async(req,res)=>
{
    const id = req.params.id;   // ✅ Correct

  console.log(id,typeof(id))
  try {
    const deleteUser = await User.findByIdAndDelete(id);

    if (!deleteUser) {
      return res.status(404).send({ message:"User not found" });
    }

    return res.status(200).send({ message: "User Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

})
router.get('/admin/user/:id',async(req,res)=>{
  const id =req.params.id;
  const element= await User.findById(id)
  res.send(element);
})
router.put('/admin/UpdateUser/:id',checkToken,requireAdmin,async(req,res)=>{
  const id =req.params.id;
  try{
    const updateUser= await User.findByIdAndUpdate(id,req.body);
    if(!updateUser)
    {
      return res.status(404).json({message:"User not found"});
    }
    return res.status(200).send({ message: "User Updated Successfully" });
  }
  catch(err){
    res.status(500).json({ error: err.message });
  }
})





export default router;
