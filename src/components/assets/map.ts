import { Boundary, Door, Lever, Tube } from "./assets"

export const drawMap = () => {

  const createImage = (src : string) => {
    const image = new Image()
    image.src = src
    return image
  }

  const map = [
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  '],
    ['  ', 'Г ', '- ', '-Ж', '- ', '7 ', '  ', '  ', '  ', 'Г ', '- ', '7 ', '  ', '< ', '- ', 'T ', '- ', '-Ж', '- ', '- ', '- ', '7 ', '  ', '  ', 'Г ', '- ', '- ', '- ', '7 ', '  '],
    ['  ', '| ', '  ', '  ', '  ', '| ', '  ', '^*', '  ', '| ', '  ', '| ', '  ', '  ', '  ', '| ', '  ', '  ', '  ', '  ', '  ', '| ', '  ', '  ', '| ', '  ', '  ', '  ', '| ', '  '],
    ['  ', 'L ', '7 ', '  ', '  ', 'L ', 'T ', '_L', '- ', '_|', '  ', 'L ', 'T ', '- ', '- ', '_L', '- ', '- ', '7 ', '  ', '  ', '| ', '  ', '  ', '| ', '  ', '<*', '- ', '-|', '  '],
    ['  ', '  ', '| ', '  ', '  ', '  ', '| ', '  ', '  ', '  ', '  ', '  ', '| ', '  ', '  ', '  ', '  ', '  ', '| ', '  ', '  ', '|-', '-Ж', '- ', '-|', '  ', '  ', '  ', '| ', '  '],
    ['  ', '  ', 'L ', '- ', '7 ', '  ', '| ', '  ', '  ', '  ', '  ', '  ', '| ', '  ', '  ', '  ', '  ', '  ', '| ', '  ', '  ', '| ', '  ', '  ', '| ', '  ', '  ', '  ', '| ', '  '],
    ['  ', '  ', '  ', '  ', '|-', '- ', '_L', '- ', 'T ', '- ', '- ', '- ', '-|', '  ', 'Г ', '- ', '7 ', '  ', '|Ж', '  ', '  ', '| ', '  ', '  ', 'L ', '- ', '- ', '- ', '-|', '  '],
    ['  ', 'Г ', '- ', '- ', '_|', '  ', '  ', '  ', '|Ж', '  ', '  ', '  ', '| ', '  ', '| ', '  ', '| ', '  ', '|-', '- ', '- ', '-|', '  ', '  ', '  ', '  ', '  ', '  ', '| ', '  '],
    ['  ', '| ', '  ', '  ', '  ', '  ', '  ', '  ', '| ', '  ', '  ', '  ', '| ', '  ', '| ', '  ', '| ', '  ', '| ', '  ', '  ', 'L ', '- ', '7 ', '  ', '  ', '  ', '  ', '| ', '  '],
    ['  ', 'L ', '- ', '-Ж', '- ', 'T ', '- ', '- ', '-|', '  ', ' |', '  ', 'L ', '- ', '_|', '  ', '| ', '  ', '| ', '  ', '  ', '  ', '  ', '| ', '  ', '  ', '^ ', '  ', '|Ж', '  '],
    ['  ', '  ', '  ', '  ', '  ', '| ', '  ', '  ', '| ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '|-', '- ', '+ ', '- ', '- ', '- ', '- ', '+ ', '- ', '- ', '-|', '  ', '| ', '  '],
    ['  ', '^*', '  ', '  ', '  ', '| ', '  ', '  ', '| ', '  ', '  ', 'Г ', '- ', '- ', '- ', '- ', '_|', '  ', '| ', '  ', '  ', '  ', '  ', '| ', '  ', '  ', 'v ', '  ', '| ', '  '],
    ['  ', '| ', '  ', 'Г ', '- ', '_L', '- ', '- ', '_|', '  ', '<*', '-|', '  ', '  ', '  ', '  ', '  ', '  ', '| ', '  ', '^*', '  ', '  ', '| ', '  ', '  ', '  ', '  ', '| ', '  '],
    ['  ', 'L ', '- ', '_|', '  ', '  ', '  ', '  ', '  ', '  ', '  ', 'L ', '- ', '- ', '- ', '-Ж', '- ', '- ', '_|', '  ', 'L ', '- ', '- ', '_L', '- ', '- ', '- ', '- ', '_|', '  '],
    ['  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ', '  ']
  ]
    
  const boundaries : Boundary[] = []
  const tubes : Tube[]= []
  const levers : Lever[] = []
  const doors : Door[] = []

  map.forEach((row, i) => {
    row.forEach((symbol, j) => {
      switch (symbol) {
        case '-Ж':
            doors.push(
              new Door({
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height
                }, 
                image: createImage('/assets_images/door_closed.png'),
                isDoorClosed: true
              })
            )
          break
        case '|Ж':
          doors.push(
            new Door({
              position: {
                x: j * Boundary.width,
                y: i * Boundary.height
              }, 
              image: createImage('/assets_images/door_opened.png'),
              isDoorClosed: false
            })
          )
          break
        case '>*':
          levers.push(
            new Lever({
              position: {
                x: j * Boundary.width,
                y: i * Boundary.height
              }, 
              image: createImage('/assets_images/lever_off.png')
            })
          )
          break
          case '<*':
            levers.push(
              new Lever({
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height
                }, 
                image: createImage('/assets_images/lever_off.png')
              })
            )
            break
          case '^*':
            levers.push(
              new Lever({
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height
                }, 
                image: createImage('/assets_images/lever_off.png')
              })
            )
            break
          case 'v*':
            levers.push(
              new Lever({
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height
                }, 
                image: createImage('/assets_images/lever_off.png')
              })
            )
            break
      }
    })
  })


  map.forEach((row, i) => {
      row.forEach((symbol, j) => {
        switch (symbol) {
          case '  ':
            boundaries.push(
                new Boundary ({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    } 
                })
            )
            break  
          case '-Ж':         
          case '- ':
            tubes.push(
              new Tube({
                  position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                  }, 
                  image: createImage('/assets_images/horizontal.png')
              })
            )
            break
          case '| ':
          case '|Ж':
            tubes.push(
              new Tube({
                  position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                  }, 
                  image: createImage('/assets_images/vertical.png')
              })
            )
            break
          case 'Г ':
            tubes.push(
              new Tube({
                  position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                  }, 
                  image: createImage('/assets_images/down_right.png')
              })
            )
            break
          case '7 ':
            tubes.push(
              new Tube({
                  position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                  }, 
                  image: createImage('/assets_images/down_left.png')
              })
            )
            break
          case 'L ':
            tubes.push(
              new Tube({
                  position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                  }, 
                  image: createImage('/assets_images/up_right.png')
              })
            )
            break
          case '_|':
            tubes.push(
              new Tube({
                  position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                  }, 
                  image: createImage('/assets_images/up_left.png')
              })
            )
            break
          case 'T ':
            tubes.push(
              new Tube({
                  position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                  }, 
                  image: createImage('/assets_images/cross3_down.png')
              })
            )
            break
          case '_L':
            tubes.push(
              new Tube({
                  position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                  }, 
                  image: createImage('/assets_images/cross3_up.png')
              })
            )
            break
          case '|-':
            tubes.push(
              new Tube({
                  position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                  }, 
                  image: createImage('/assets_images/cross3_right.png')
              })
            )
            break
          case '-|':
            tubes.push(
              new Tube({
                  position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                  }, 
                  image: createImage('/assets_images/cross3_left.png')
              })
            )
            break
          case '+ ':
            tubes.push(
              new Tube({
                  position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                  }, 
                  image: createImage('/assets_images/cross4.png')
              })
            )
          break
          case '> ':
          case '>*':
            tubes.push(
              new Tube({
                  position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                  }, 
                  image: createImage('/assets_images/deadend_left.png')
              })
            )
          break
          case '< ':
          case '<*':
            tubes.push(
              new Tube({
                  position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                  }, 
                  image: createImage('/assets_images/deadend_right.png')
              })
            )
          break
          case '^ ':
          case '^*':
            tubes.push(
              new Tube({
                  position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                  }, 
                  image: createImage('/assets_images/deadend_down.png')
              })
            )
          break
          case 'v ':
          case 'v*':
            tubes.push(
              new Tube({
                  position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                  }, 
                  image: createImage('/assets_images/deadend_up.png')
              })
            )
          break
        }
      })
    })

    return {boundaries, tubes, levers, doors}
}