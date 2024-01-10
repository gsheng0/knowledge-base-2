import * as articlesDb from "./../data/articles.js";
import * as usersDb from "./../data/users.js";


export const main = async() => {
    const users = [];
    const articles = [];
    for(let i = 0; i < 10; i++){
        users.push(await usersDb.createUser(
            `user${i}@email.com`,
            `user${i}`,
            `pAssword${i}$!${i}`
        ));
        console.log(`Created User #${i}`);
    }

    for(let i = 0; i < 100; i++){
        articles.push(await articlesDb.createArticle(
            `Title #${i}`,
            `Content of Article #${i}`,
            getRandomTags(),
            users[getRandomInt(0, users.length)]._id
        ));
        console.log(`Created Article #${i}`);
    }
    console.log("Done Seeding Database");
}

export const getRandomTags = () => {
    const tags = ['cs', 'food', 'violin', 'school', 'instructions', 'notes', 'bugfix', 
        'idea', 'shower thought', 'misc'];
    let numTags = getRandomInt(1, 4);
    const output = [];
    for(let i = 0; i < numTags; i++){
        output.push(tags[getRandomInt(0, tags.length)]);
    }
    return output;
}

export const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

main();