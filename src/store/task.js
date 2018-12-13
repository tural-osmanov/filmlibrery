export default {
    state: {
        tasks: [
            {
                'id': 1,
                'title': "GrowthBusters: Hooked on Growth",
                'descriotion': 'I directed this documentary challenging the myths linking growth with prosperity and fullfilment.',
                'whatWhatch': 'Film',
                'comleted': false,
                'editing': false,
                'time': '1 Hours 30 Minutes'
            },
            {
                'id': 2,
                'title': "Game of Thrones",
                'descriotion': 'Best serials',
                'whatWhatch': 'Serial',
                'comleted': false,
                'editing': false,
                'time': '21 Hours 30 Minutes'
            }
        ]
    },
    mutations: {
        newTask (state, payload) {
            state.tasks.push(payload)
        }
    },
    actions: {
        newTask ({commit}, payload) {
            payload.id = Math.random()
            commit('newTask', payload)
        }
    },
    getters : {
        tasks (state) {
            return state.tasks
        }
    }
}