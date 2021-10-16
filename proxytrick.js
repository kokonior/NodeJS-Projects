Object.setPrototypeOf(
    Number.prototype,
        new Proxy(Number.prototype, {
            get(_, _end, start) {
                // where (start)[_end]
                let end = parseInt(_end)
                if (isNaN(end)) {
                    // warning or error
                    // eventually, fallback
                    return start
                }

                // sort behaviour - default ASC
                let s = +1

                if (start > end) {
                    // swap
                    let tmp = start
                    start = end
                    end = tmp
                    // sort behaviour - DESC
                    s = -1
                }

                // generate range
                return Array(end - start + 1)
                    .fill()
                    .map((_, i) => start + i)
                    .sort(() => s)
            },
        })
)

let contoh1 = (1)[10] 
console.log(contoh1) // print 1-10 [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

let contoh2 = (10)[1]
console.log(contoh2) // print 10-1 [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
