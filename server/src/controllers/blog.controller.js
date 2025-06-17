import supabase from "../config/connection.js";

const createNewBlog = async (req, res) => {
  try {
    const { title, subtitle, description } = req.body;

    const { data, error } = await supabase
      .from("blogs")
      .insert({ title: title, subtitle: subtitle, description: description })
      .select();
    if (error) {
      return res.send(error);
    }

    res.send({ message: "Created Successfully!", data: data });
  } catch (error) {
    console.log("An error has been occurred:::", error);
  }
};

const getBlogs = async (req,res) => {
    try{
        const {data, error} = await supabase.from('blogs').select()
        if(error){
            return res.send(error)
        }
        res.send({message: "Blogs Fetched Successfully.", data: data});

    }
    catch(error){
        console.log("An error has been occured:::", error)

    }
}

const getBlogsById = async (req,res) => {
    try{
        const {id} = req.params;
        const {data, error} = await supabase.from('blogs').select().eq("id", id);
        if(error){
            return res.send(error)
        }
        res.send({message: "Blog fetched successfully.", data: data })

    }
    catch(error){
        console.log("An error has been occured.", error);
    }
}

const updateBlogs = async(req,res)=>{
    try{
        const {id} = req.params;
        const {title, subtitle, description} = req.body;
        const {data, error} = await supabase.from('blogs').update({
            title: title,
            subtitle: subtitle,
            description: description
        }).eq("id", id).select();

        if(error){
            return res.send(error)
        }
        res.send({message: "Blog Updated successfully.", data: data })

    }
    catch(error){
        console.log("An error has been occured.", error)

    }
}

const deleteBlog = async(req,res) => {
    try{
        const {id} = req.params;
        const {error} = await supabase.from('blogs').delete().eq("id", id)
        if(error){
            return res.send(error)
        }
        res.send({message: "Blog Deleted successfully." })



    }
    catch(error){
        console.log("An error has been occured.", error)


    }
}

export { createNewBlog, getBlogs, getBlogsById,updateBlogs , deleteBlog};
