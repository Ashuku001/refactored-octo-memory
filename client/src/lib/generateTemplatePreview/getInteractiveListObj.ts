import { FormattedInteractiveListData } from "@/types"


export const getInteractiveListObj = (data: FormattedInteractiveListData) => {
    let tempVariables = {
        type: "LIST",
        list: {
            body: '',
            button: ''
        }
    }
    let template = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: "",
        type: "interactive",
        interactive: {}
    }
    let interactive: any =  {
        type: "list",
        body: {
          text: "",
        },
        action: {
          button: "",
          sections: []
        },
    }
    let header = {
        type: "",
        text: ""
    }
    let footer = {
        text: ""
    }


    if(data?.header) {
        let header
        if(data.header.type === 'text') {
            tempVariables.list['header'] = "TEXT"
            tempVariables.list['listTextHead'] ={ 
                body: data.header.text
            }
            header = data.header
            interactive['header'] = header
        }
    }

    if(data?.body && data?.body?.text.length > 0) {
        tempVariables.list['body'] = data?.body?.text
        interactive.body.text = data?.body?.text
    }

    if(data?.footer && data?.footer?.text.length > 0) {
        tempVariables.list['footer'] = data?.footer?.text
        interactive['footer'] = {text: data?.footer?.text}
    
    }

    if(data?.button && data?.button?.length > 0) {
        tempVariables.list['button'] = data?.button
        interactive.action.button = data?.button
    }
    
    if(data?.sections){
        interactive.action.sections = data?.sections
        console.log("THE DATA", data?.sections)
        let varSections = [] // for local database
        let intSections = [] // for whatsapp template
        data?.sections?.forEach((section) => {
            let varSection = {
                title: '',
                rows: []
            }
            let intSection = {
                title: '',
                rows: []
            }
            section.rows?.forEach((row) => {
                const newVarRow = {buttonId: row.id, title: row.title, description: row.description,  productId: row.productId}
                const newIntRow = {id: row.id, title: row.title, description: row.description}
                varSection.rows.push(newVarRow)
                intSection.rows.push(newIntRow)
            })
            varSections.push({...varSection, title: section.title})
            intSections.push({...intSection, title: section.title})
        })
        tempVariables.list['sections'] = varSections
        interactive.action.sections = intSections
    }

    template.interactive = interactive

    return {template, tempVariables}
}

