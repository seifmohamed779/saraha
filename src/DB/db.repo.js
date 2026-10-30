

export async function findOneDoc({model,filter={},select}={}) {
return await model.findOne(filter,select)
}
export async function findById({model,id,select}={}) {
return await model.findById(id,select)
}
export async function createDoc({model,insertedData,options}={}) {
return await model.create(insertedData)
}