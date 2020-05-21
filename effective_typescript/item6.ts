/*
 * @Author: your name
 * @Date: 2020-05-19 23:51:45
 * @LastEditTime: 2020-05-19 23:52:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item6.ts
 */


interface Person {
    name: string;
}

interface Lifespan {
    birth: Date;
    death?: Date;
}

type PersonSpan = Person & Lifespan;

