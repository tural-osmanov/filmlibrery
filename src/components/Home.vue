<template lang="pug">
    .content-wrapper
        section 
            .container
                h1.ui-title-1 Home
                input(
                    type="text"
                    placeholder="What we will watch?"
                    v-model="taskTitle"
                    @keyup.enter="newTask"
                )
                textarea(
                    type="text"
                    v-model="taskDescription"
                    @keyup.enter="newTask"
                )
                .option-list
                    input.what-whatch--radio(
                        type="radio"
                        id="radioFilm"
                        value="Film"
                        v-model="whatWhatch"
                    )
                    label(
                        for="radioFilm"
                    ) Film
                    input.what-whatch--radio(
                        type="radio"
                        id="radioSerial"
                        value="Serial"
                        v-model="whatWhatch"
                    )
                    label(
                        for="radioSerial"
                    ) Serial
                .total-time
                    .total-time__film(
                        v-if="whatWhatch === 'Film'"
                    )
                        span Total Film Time
                    .total-time__film(
                        v-if="whatWhatch === 'Serial'"
                    )
                        span Total Serial Time
                .tag-list
                    .ui-tag__wrapper
                        .ui-tag
                            span.tag-title Dogs
                            span.button-close

        
</template>

<script>
export default {
    data(){
        return{
            taskTitle: '',
            taskId: 3,
            taskDescription: '',
            whatWhatch: 'Film'  
        }
    },
    methods:{
        newTask(){
            if(this.taskTitle === ''){
                return
            }
            this.tasks.push({
                id: this.taskId,
                title: this.taskTitle,
                descriotion: this.taskDescription,
                whatWhatch: this.whatWhatch,
                completed: false,
                editing: false
            })

            //Reset
            this.taskId += 1
            this.taskTitle = ''
            this.taskDescription = ''
        }
    }
}
</script>


<style lang="stylus" scoped>
.option-list
    display flex
    .what-whatch--radio
        margin-right 12px
    label
        margin-right 20px
        cursor pointer
        &:last
            margin-right 0
.ui-label
    margin-right 8px
.task-item
    margin-bottom 20px
    &:last
        margin-bottom 0
.task-item__info
    display flex
    text-align center
    justify-content space-between
    margin-bottom 20px
    .button-close
        width 20px
        height @width
.task-item__header
    display flex
    align-items center
    margin-bottom 18px   
    .ui-checkbox-wrapper
        margin-right 8px
        font-size: 21px;    
    .ui-title-3
        margin-bottom 0
</style>
