
    function subirUno(file) {

              return new Promise((resolve, reject) => {

                      let uploadPath = 'src/uploads/' + file .name;
                      file.mv(uploadPath, function(err) {
                        if (err) {
                          reject(err)
                        } 
                        else {
                          console.log(file.name + ' se proceso')
                           resolve(file.name)
                        }
                      })
              });
    }

    export { subirUno }




  