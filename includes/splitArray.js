module.exports = (length, array) => {
        let splitted = []
        let load = 0
        for (var i in array){
        if(load === 0){
            splitted.push([array[i]])
        }else if(load > length){
            load = 0
            splitted.push([array[i]])
        }else if(![0, length].includes(load)){
            splitted[splitted.length - 1].push(array[i])
        }else{
            splitted.push([array[i]])
            load = 0
        }
        load++
    }

    return splitted
}