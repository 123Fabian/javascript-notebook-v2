import { useTypedSelector } from './use-typed-selector'

export const useCumulativeCode = (cellId: string) => {
    return useTypedSelector((state) => {
        const { data, order} = state.cells;

        const ordereredCells = order.map( id => data[id] )
        
        const showFunction = 
            `
                import _React from 'react'
                import _ReactDOM from 'react-dom'

                var show = (value) => {

                    const root = document.querySelector('#root');

                    if (typeof value === 'object'){
                        if(value.$$typeof && value.props){
                            _ReactDOM.render(value, root )
                        }
                        root.innerHTML = JSON.stringify(value)
                    }
                    else{
                       root.innerHTML = value
                    }
                };
            `
        const showFunctionNoOP = `var show = () => {}`
        const cumulativeCode = []
        
        for( let c of ordereredCells) {
            if(c.type === 'code'){
                if(c.id === cellId){
                    cumulativeCode.push(showFunction)
                }
                else {
                    cumulativeCode.push(showFunctionNoOP)
                }
                cumulativeCode.push(c.content)
            }
            if(c.id === cellId){
                break;
            }
        }
        return cumulativeCode
    }).join('\n')
};