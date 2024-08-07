const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    cart:[
        {
            product:{
                type:Schema.Types.ObjectId,
                ref:"Product"
            },
            count:{
                type:Number,
                default:1,
            }

        }
    ],
    liked:[
        {
            type:Schema.Types.ObjectId,
            ref:"Product",
        }
    ],
    type:{
        type:String,
        default:"User",
    },
    orders:[
        {
            type:Schema.Types.ObjectId,
            ref:"Order"
        }
    ],
    wishlist:[
        {
            type:Schema.Types.ObjectId,
            ref:"Product",
        }
    ]

},{
    timestamps:true,
})

const User=mongoose.model("User",userSchema);
module.exports=User;
