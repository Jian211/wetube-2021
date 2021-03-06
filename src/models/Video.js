import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title : { 
        type : String,
        required : true,
    },
    videoUrl: { type : String , require:true},
    description : { 
        type : String,
        required : true,
    },
    createdAt: {
        type : Date,
        required : true,
        default : Date.now
    },
    hashtags:[{ 
        type:String,
        maxlength : 5
    }],
    meta:{
        views: { 
            type : Number,
            default : 0
        },
        rating: { 
            type : Number, 
            default : 0
        },
    },
})

videoSchema.static("formatHashTags", function(hashtags){
    return hashtags.split(",").map( (word) =>  word.startsWith("#") ? word : `#${word}`)
})

const Video = mongoose.model("Video",videoSchema);

export default Video;