import React from 'react';
import axios from 'axios'

let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzMzk5IiwianRpIjoiNWE1ZjAxZDYxMmQ3YzllNzhhOWZlODMwYjA5ZWY2MmM4ZGQwOTA2ZmU5M2IzNGE0ZjhmNGY4ZTg4MmFkZjg2NTZkYjIyOTQ0MDc4ODEwMzkiLCJpYXQiOjE2NTUzNDUzNDksIm5iZiI6MTY1NTM0NTM0OSwiZXhwIjoxNjg2ODgxMzQ5LCJzdWIiOiIzMyIsInNjb3BlcyI6W119.mWSeqsNNEJUAWpvgfhN0fkyeAGw2oK8ih0ud2gDx82czSfpF4dSOSVQcMfsM75o1q09JSJfRIzX5NT2UgITMMJZmfN3bXhvwKqRJY_PSgCI1ukpjJ4AlTToEjXvypTCaUA3aCQCwqwP9dH4efUG0q2shvT8uc8UWtZROcDQ5KKxsqp8XRpXqiACc_JLjonqHpCSanJF7oYhP-A6s2b3cmRlB1N9GmA5-7ZlNkpqNSOW32NJLeNXn1nGBG5r7H2Ccr2vU2n5VfgwfNwvYxFqVZRcX2JUE0hVMAsdvbnYSn79uniYCiSgdqr8u1w7TyyHqxxN_yNFKUcKeCm2kYfuoUHT_GMak0N7AxYYG5DWSiABpNWR81UzCsEIdyxBlYq4bYt8cIhONdp_kUi_pvhsikMzELqL14UqljkNFmQki9STZHdyjOoaE-CHkkddAjeA9U-VnlKdiF6hj_xq1Vt4nK0T3-BZw0Qwx1oEOlp-KHQX2-Gl17DRGb7jCMLwXsm2ebOudNqi4j9Ci64HN0t2zKiqT_bC2hT7Fd9zCrLA1WmQLRxzWjy0YFabiGqmhylfdQSKfv35DFuXTxtYCKmzxcHouJwAuaIDF0d8BfTq9-LAz5c5Bcy69ckRxi7dcdUabDubxPkKN9a7aOzCLGTldfpDu12Cki5wV9ywGWjgiwYg';

const axiosAuth = axios.create({
  baseURL: 'https://staging.lexmeet.com/api/',
  headers: { 
    Authorization: `Bearer ${token}` 
  }
});

export async function getTypes(props) {

    let types = []
    console.log("Getting types...")
    await axiosAuth.get(`client/lexdocs/types`)
    .then(function({data}){

      data.forEach(element => {
        const newData = [{
          title: element.type,
          value: element.lexdoc_type_id
        }]

        types.push(...newData)
      });

      console.log("getitems type: ",types)
    })
    .catch(function(error){
      return console.log(error)
    })

    return types
}

export async function getKinds(lexdoc_type_id) {
  console.log("lexdocs id:",lexdoc_type_id)

  let kinds = []
  console.log("Getting kinds...")
  await axiosAuth.get(`client/lexdocs/kinds/${lexdoc_type_id}`)
  .then(function({data}){

    const response = data.kinds

    response.forEach(element => {
      const newData = [{
        title: element.kind,
        value: element.lexdoc_kind_id
      }]

      kinds.push(...newData)
    });

    console.log("getitems kinds: ",kinds)
  })
  .catch(function(error){
    return console.log(error)
  })

  return kinds
}

export async function getTemplateByKind(lexdoc_kind_id) {
  console.log("lexdocs id:",lexdoc_kind_id)

  let templateByKind = []
  console.log("Getting templates...")
  await axiosAuth.get(`client/lexdocs/template-by-kind/${lexdoc_kind_id}`)
  .then(function({data}){

    console.log(data.templates)
    const response = data.templates

    response.forEach(element => {
      const newData = [{
        title: element.name,
        value: element.lexdoc_template_id,
      }]

      templateByKind.push(...newData)
    });

    console.log("getitems templateByKind: ",templateByKind)
    
  })
  .catch(function(error){
    return console.log(error)
  })

  return templateByKind
}

export async function fetchTemplate(lexdoc_type_id, lexdoc_kind_id, lexdoc_template_id, how_many) {

  const schema = {
    "lexdoc_type_id" : lexdoc_type_id.value,
    "lexdoc_kind_id" : lexdoc_kind_id.value,
    "lexdoc_template_id" : lexdoc_template_id.value,
    "how_many" : how_many.value,
    "kind_of_parties[Affiant][0]" : "Individual"
  }

  let response = []
  console.log("schema:", schema)

  await axiosAuth.post(`client/lexdocs/template/get`, schema, { headers:{"Content-Type" : "application/json"} })
  .then(function({ data }){
    console.log(data)
    return response = data
  })
  .catch(function(error){
    return console.log(error)
  })

  return response;
}