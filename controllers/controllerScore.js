exports.win = async function (ctx) {
    await givePoints(ctx, 3);
};

exports.draw = async function (ctx) {
    await givePoints(ctx, 1);
};

exports.set = async function (ctx) {
    if (ctx.message.from.id == 589215) {
        var array = ctx.message.text.split(" ");
        await ctx.reply(showPoints({ name: array[1], points: array[2] }));
    } else {
        await ctx.reply('https://giphy.com/gifs/ian-mckellen-nlcJ4MkoG3Tri');
    }
};

exports.points = async function (ctx) {
    const array = ctx.session.table || [];
    var name = ctx.message.from.first_name;

    i = findPlayerByName(array, name);

    if (i == -1) {
        i = createPlayer(array, name, 0);
    }

    await ctx.reply(showPoints(array[i]));
    ctx.session.table = array;
};

exports.restart = async function (ctx) {
    ctx.session.table = [];
    await ctx.reply('Tabla reiniciada');
};

exports.table = async function (ctx) {
    const array = ctx.session.table || [];
    var name = ctx.message.from.first_name;
    i = findPlayerByName(array, name);
    
    if (i == -1) {
        i = createPlayer(array, name, 0);
    }

    var AsciiTable = require('ascii-table');
    var table = new AsciiTable('The Cat League');

    table.setHeading('', 'Jugador', 'Puntos')

    for (let i = 0; i < array.length; i++) {
        table.addRow(i + 1, array[i].name, array[i].points);
    }

    await ctx.replyWithMarkdown("```" + table.toString() + "```");
};

//////////////////////////////////////////////////////////////////////////////////////////////

async function givePoints(ctx, points) {
    const array = ctx.session.table || [];
    var name = ctx.message.from.first_name;

    i = sumPointsInArray(array, name, points);

    await ctx.reply(showPoints(array[i]));
    ctx.session.table = array;
}

function sumPointsInArray(array, name, points) {
    i = findPlayerByName(array, name);
    if (i != -1) {
        array[i].points += points;
        return i;
    } else {
        createPlayer(array, name, points);
        return array.length - 1;
    }
}

function showPoints(player) {
    return `El jugador ${player.name} va ${player.points} puntos`;
}

function findPlayerByName(array, name) {
    found = -1;
    for (var i = 0; i < array.length && found == -1; i++) {
        if (array[i].name === name) {
            found = i;
        }
    }
    return found;
}

function createPlayer(array, name, points) {
    array.push({ name: name, points: points });
    return array.length - 1;
}
