/*var finalPacket = {
 "conditions": {
 "condition": {
 "if": {
 "expression": {
 "group": {
 "booleanExpr": [

 {
 "@var": "a",
 "@operator": "==",
 "@value": "1",
 "@type": "string"
 },

 {
 "@logicalOperator": "AND",
 "@var": "x",
 "@operator": "==",
 "@value": "2",
 "@type": "string"
 }
 ],
 }
 },
 "operation": {
 "data": {
 "@type": "relativePath",
 "value": "*1"
 },
 "variable": [
 {
 "@name": "var",
 "@value": "val"
 },
 {
 "@name": "var",
 "@value": "val"
 },
 {
 "@name": "var",
 "@value": "val"
 },
 {
 "@name": "var",
 "@value": "val"
 }
 ]
 }
 },
 "elseif": {
 "expression": {
 "group": {
 "booleanExpr": {
 "@var": "$response.doc.param[1].__attribute__.value",
 "@operator": "!=",
 "@value": "NULL"
 }
 }
 },
 "operation": {
 "data": {
 "@type": "relativePath",
 "value": "*1"
 }
 }
 }
 }
 }
 }*/


const parserJson2Xml = (requestJson)=> {
    //We need to fetch variable names from a bucket
    const createBooleanExpr = (boolExprVariables)=> {
        return {

            "@id": boolExprVariables.id,
            "@field": boolExprVariables.field,
            "@operator": boolExprVariables.operator,
            "@input": boolExprVariables.input,
            "@value": boolExprVariables.value,
            "@type": boolExprVariables.type,
        }

    }

    const parseExpression = (rules, outerOperator)=> {

        const groupArr = []
        let innerXml;
        let group;
        for (const rule of rules) {

            if ("condition" in rule) {
                innerXml = parseExpression(rule["rules"], rule["condition"])

            } else {
                groupArr.push(createBooleanExpr(rule))

            }
        }

        //We need to format it to fit in
        if (innerXml) {
            group = innerXml['group']
        }

        //We may or may not have outerOperator
        return outerOperator ? {
            group: {
                '@logicalOperator': outerOperator,
                booleanExpr: groupArr,
                group
            }
        } : {group: {booleanExpr: groupArr, group}}

    }


    const parseOperation = (then)=> {

        //We need to check for
        //data or variable
        let innerXml;

        if ('data' in then) {
            //We are assuming that we have only one type
            innerXml = {data: {'@type': Object.keys(then.data)[0], value: then.data[Object.keys(then.data)[0]]}}

        } else if ('variable' in then) {
            const variableArr = []
            for (const elemVariable of then.variable) {
                variableArr.push({
                    '@name': Object.keys(elemVariable)[0],
                    '@value': elemVariable[Object.keys(elemVariable)[0]]
                })
            }
            innerXml = {'variable': variableArr}

        }
        return {operation: innerXml}
    }


    //Execution starts here
    var conditionChildren = [];

    for (const rJson of requestJson) {

        var condition = {};
        for (const key of Object.keys(rJson)) {

            //Lets call the function which parses the key
            //This function must handle 'Operation' and 'Expression'
            condition[key] = Object.assign({}, parseExpression(rJson[key]["rules"], rJson[key]["condition"] ?
                rJson[key]["condition"] : null), parseOperation(rJson[key]["then"]))
        }
        conditionChildren.push(condition)
    }

    let conditions = {"conditions": {"condition": conditionChildren}}

    var builder = require('xmlbuilder');
    var feed = builder.create(conditions, {encoding: 'utf-8'})

    return feed
}

var requestJson = [{
    "if1": {
        "condition": "AND",
        "rules": [
            {
                "id": "price",
                "field": "price",
                "type": "double",
                "input": "number",
                "operator": "less",
                "value": "10"
            },
            {
                "condition": "OR",
                "rules": [
                    {
                        "id": "category",
                        "field": "category",
                        "type": "integer",
                        "input": "select",
                        "operator": "equal",
                        "value": "23"
                    },
                    {
                        "id": "category",
                        "field": "category",
                        "type": "integer",
                        "input": "select",
                        "operator": "equal",
                        "value": "156"
                    }
                ]
            }
        ],
        "valid": true,
        "then": {
            "data": {
                "relativePath": "*1*2",
                "absolutePath": "*123*1*2",
                "urlId": "1"
            }
        }
    },
    "elseif": {
        "condition": "AND",
        "rules": [
            {
                "id": "price",
                "field": "price",
                "type": "double",
                "input": "number",
                "operator": "less",
                "value": "1025"
            },
            {
                "condition": "OR",
                "rules": [
                    {
                        "id": "category",
                        "field": "category",
                        "type": "integer",
                        "input": "select",
                        "operator": "equal",
                        "value": "112"
                    },
                    {
                        "id": "category",
                        "field": "category",
                        "type": "integer",
                        "input": "select",
                        "operator": "equal",
                        "value": "11134"
                    }
                ]
            }
        ],
        "valid": true,
        "then": {
            "variable": [
                {
                    "$tagName1": "$value1"
                }, {
                    "$tagName": "$value"
                },
            ]
        }
    },
},
    {
        "if2": {
            "condition": "AND",
            "rules": [
                {
                    "id": "price",
                    "field": "price",
                    "type": "double",
                    "input": "number",
                    "operator": "less",
                    "value": "10.25"
                },
                {
                    "condition": "OR",
                    "rules": [
                        {
                            "id": "category",
                            "field": "category",
                            "type": "integer",
                            "input": "select",
                            "operator": "equal",
                            "value": "2"
                        },
                        {
                            "id": "category",
                            "field": "category",
                            "type": "integer",
                            "input": "select",
                            "operator": "equal",
                            "value": "1"
                        }
                    ]
                }
            ],
            "valid": true,
            "then": {
                "data": {
                    "relativePath": "*1*2",
                    "absolutePath": "*123*1*2",
                    "urlId": "1"
                }
            }
        },
        "elseif2": {
            "condition": "AND",
            "rules": [
                {
                    "id": "price",
                    "field": "price",
                    "type": "double",
                    "input": "number",
                    "operator": "less",
                    "value": "10.25"
                },
                {
                    "condition": "OR",
                    "rules": [
                        {
                            "id": "category",
                            "field": "category",
                            "type": "integer",
                            "input": "select",
                            "operator": "equal",
                            "value": "2"
                        },
                        {
                            "id": "category",
                            "field": "category",
                            "type": "integer",
                            "input": "select",
                            "operator": "equal",
                            "value": "1"
                        }
                    ]
                }
            ],
            "valid": true,
            "then": {
                "variable": [
                    {
                        "$tagName": "$value"
                    }
                ]
            }
        },
    }]

parserJson2Xml(requestJson)



