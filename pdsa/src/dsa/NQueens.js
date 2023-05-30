class QueenHandler{
    constructor() {

    };

    checkMove(mat, row, col){
        if(mat[row][col] != 1){

            for(let col_ = 0; col_ < mat.length; col_ ++){
                if(col_ != col){
                    if(mat[row][col_] == 1){
                        return false;
                    }
                }
            }

            for(let row_ = 0; row_ < mat.length; row_++){
                if(row_ != row){
                    if(mat[row_][col] == 1){
                        return false;
                    }
                }
            }

            for (let x = row, y = col; x >= 0 && y >= 0; x--, y--) {
                if(mat[x][y] != mat[row][col]){
                    if (mat[x][y] == 1) {
                        return false;
                      }
                }
            }

            for (let x = row, y = col; x < mat.length && y >= 0; x++, y--) {
                if(mat[x][y] != mat[row][col]){
                    if (mat[x][y] == 1) {
                        return false;
                      }
                }
            }

            for (let x = row, y = col; x < mat.length && y < mat.length; x++, y++) {
                if(mat[x][y] != mat[row][col]){
                    if (mat[x][y] == 1) {
                        return false;
                      }
                }
            }            

            for (let x = row, y = col; x >= 0 && y < mat.length; x--, y++) {
                if(mat[x][y] != mat[row][col]){
                    if (mat[x][y] == 1) {
                        return false;
                      }
                }
            }

            mat[row][col] = 1;
            return true;
        }
        else {
            return true;
        }   
    }
}

export default QueenHandler;                                         