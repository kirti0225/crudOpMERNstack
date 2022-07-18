const express= require("express")
const router= express.Router();
const users= require("../models/useSchema")


// router.get("/",(req,res)=>{
//     console.log("connect");
// })

//register user

router.post("/register",async(req,res)=>{
    //console.log(req.body)
    const {name, email,age,mobile,work,add,desc}= req.body;
    if(!name||!email||!age||!mobile||!work||!add||!desc){
       return res.status(422).send("please fill data")
    }
    try{
        const preuser= await users.findOne({email:email});
        console.log(preuser);
        if(preuser){
          return  res.status(422).status("this is user is alreday present");
        }else{
            const adduser= new users({
                name,email,age,mobile,work,add,desc
            });

            await adduser.save();
          return  res.status(201).send(adduser);
            console.log(adduser);
        }}
        catch (error){
          return  res.status(422).send(error)
        }
    }
)

//get data
router.get("/getdata",async(req,res)=>{
    try{
        const userdata= await users.find();
        res.status(201).send(userdata)
        console.log(userdata);
    } catch (error){
        return res.status(422).send(error)
    }
})

//individual data
router.get("/getuser/:id",async(req,res)=>{
    try{
        console.log(req.params);
        const {id} = req.params;

        const userindividual= await users.findById({_id:id});
        console.log(userindividual);
        res.status(201).send(userindividual)
    } catch (error){
        return res.status(422).send(error)
    }
})

//update

router.patch("/updateuser/:id",async(req,res)=>{
    try{
        const {id}= req.params;
        const updateduser= await users.findByIdAndUpdate(id,req.body,{
            new:true
        });
        console.log(updateduser);
        res.status(201).send(updateduser);
    }catch(error){
        return res.status(422).send(error);
    }
})

// delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletuser = await users.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.status(201).send(deletuser);

    } catch (error) {
        return res.status(422).send(error);
    }
})



module.exports = router;