module.exports = {
    "hall": {
        name: "Зал",
        lights: {
            "left": { pin: 100, name: "Левый", status: 0 },
            "center": { pin: 8, name: "Центральный", status: false },
            "right": { pin: 101, name: "Правый", status: 0 },
            "hallway": { pin: 1, name: "Прихожая", status: false }
        }
    },
    "kitchen": {
        name: "Кухня",
        lights: {
            "сeil": { pin: 2, name: "Потолок", status: false },
            "table": { pin: 3, name: "Стол", status: false },
            "hob": { pin: 4, name: "Плита", status: false }
        }
    },
    "bedroom": {
        name: "Спальня",
        lights: {
            "left": { pin: 102, name: "Левый", status: 0 },
            "center": { pin: 5, name: "Потолок", status: false },
            "right": { pin: 103, name: "Правый", status: 0 },
            "pantry": { pin: 0, name: "Кладовка", status: false }
        }
    },
    "bathroom": {
        name: "Сортир",
        lights: {
            "сeil": { pin: 6, name: "Свет", status: false },
            "fan": { pin: 7, name: "Вентилятор", status: false },
        }
    }
}