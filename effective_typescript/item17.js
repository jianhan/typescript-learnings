/*
 * @Author: your name
 * @Date: 2020-05-29 21:10:25
 * @LastEditTime: 2020-05-29 22:44:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item17.ts
 */
var players = [{
        name: "Bob",
        age: 30,
        favGame: {
            title: "Half Life",
            company: "Valve",
            age: 12
        }
    }];
players[0].favGame.title = "Tetris";
players[0].name = "Jim";
console.log(players);
