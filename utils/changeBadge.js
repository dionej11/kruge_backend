const Badge = {USD: 3700, MXN: 200, EUR: 4200};

function changeBadge(value, originBadge) {
    let valueCOP = value * Badge[originBadge];
    return valueCOP;
}

module.exports = { changeBadge };