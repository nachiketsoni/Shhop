class ApiFeatures{
    constructor(query,queryStr){
        this.query=query,
        this.queryStr=queryStr
    }

    search(){
        const keyword=this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword,
                $options:"i",
            },
        }:{};
        this.query=this.query.find({...keyword});
        return this;
    }
    filter(){
        const tmpQuery={...this.queryStr};
        //remove some fields for category
        const removeFields=['keyword',"page","limit"];
        removeFields.forEach((key)=>delete tmpQuery[key]);

        //filter for Price and Rating
        let queryStr=JSON.stringify(tmpQuery);
        queryStr=queryStr.replace(/\b(gte|gte|lt|lte)\b/g,(key)=>`$${key}`);
        this.query=this.query.find(JSON.parse(queryStr));
        return this;
    }
    pagination(resultPerPage){
        const currentPage=Number(this.queryStr.page)||1;
        const skip=resultPerPage*(currentPage-1);
        
        this.query=this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}


export default ApiFeatures;