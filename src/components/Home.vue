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
                //- TOTAL TIME
                .total-time
                    //- Film Time 
                    .total-time__film(
                        v-if="whatWhatch === 'Film'"
                    )
                        span.time-title Hours
                        input.time-input(
                            type="number"
                            v-model="filmHours"
                        )
                        span.time-title Minutes
                        input.time-input(
                            type="number"
                            v-model="filmMinutes"
                        )
                        
                        p {{ filmTime }}

                    //- Serial Time
                    .total-time__serial(
                        v-if="whatWhatch === 'Serial'"
                    )
                        span.time-title How many season?
                        input.time-input(
                            type="number"
                            v-model="serialSeason"
                        )
                        span.time-title How many series?
                        input.time-input(
                            type="number"
                            v-model="serialSeries"
                        )
                        span.time-title How long is one series? (minutes)
                        input.time-input(
                            type="number"
                            v-model="serialSeriesMinutes"
                        )
                        p {{ serialTime }}
                //- Список тегов
                //- Добавть новый тег
                .tag-list.tag-list--add
                    .ui-tag__wrapper(
                        @click="tagMenuShow = !tagMenuShow"
                    )
                        .ui-tag
                            span.tag-title Add New
                            span.button-close(
                                :class="{ active: !tagMenuShow }"
                            )
                //- Отображение инпута
                .tag-list.tag-list--menu(
                    v-if="tagMenuShow"
                )
                    input.tag-add--input(
                        type="text"
                        placeholder="New tag"
                        v-model="tagTitle"
                        @keyup.enter="newTag"
                    )
                    .button.button-default(
                        @click="newTag"
                    ) Send
                .tag-list
                    .ui-tag__wrapper(
                        v-for="tag in tags"
                        :key="tag.title"
                    )
                        .ui-tag(
                            @click="addTagused(tag)"
                            :class="{used: tag.use}"
                        )
                            span.tag-title {{ tag.title }}
                            span.button-close
            p {{ tagsUsed }}
                .button-list
                    .button.button--round.button-primary(
                        @click="newTask"
                    ) Send
        
</template>

<script>
export default {
    data(){
        return{
            taskTitle: '',
            taskDescription: '',
            whatWhatch: 'Film',

            // Total Time
            // Film
            filmHours: 1,
            filmMinutes: 30,
            // Serial
            serialSeason: 1,
            serialSeries: 11,
            serialSeriesMinutes: 40,
            
            // Теги
            tagTitle: '',
            tagsUsed: [],
            tagMenuShow: false,
            tags: [
            {
                title: 'Comedy',
                use: false
            },
            {
                title: 'Western',
                use: false
            },
            {
                title: 'Adventure',
                use: false
            }
        ]
        }
    },
    methods:{
        newTag () {
            if(this.tagTitle === ''){
                return
            }
            this.tags.push({
                title: this.tagTitle,
                used: false
            })
            // const tag = {
            //     title: this.tagTitle
            // }
        },
        newTask () {
            if(this.taskTitle === ''){
                return
            }

            let time 
            if(this.whatWhatch === 'Film') {
                time = this.filmTime
            }else{
                time = this.serialTime
            }

            const task = {
                title: this.taskTitle,
                descriotion: this.taskDescription,
                whatWhatch: this.whatWhatch,
                time,
                tags: this.tagsUsed,
                completed: false,
                editing: false
            }
            this.$store.dispatch('newTask', task)
            console.log(task)
            //Reset
            this.taskTitle = ''
            this.taskDescription = ''
            this.tagsUsed = []
        },
        addTagused( tag ){
            tag.use = !tag.use
            if( tag.use ) {
                this.tagsUsed.push({
                    title: tag.title
                })
            }else{
                this.tagsUsed.splice(tag.title, 1)
            }
        },
        getHoursAndMinutes (minutes) {
            let hours = Math.trunc(minutes/60)
            let min = minutes % 60
            return hours + " Hours " + min + " Minutes"
        }
    },
    computed: {
        filmTime () {
            let min = (this.filmHours * 60) + (this.filmMinutes * 1)
            return this.getHoursAndMinutes(min)
        },
        serialTime () {
            let min = this.serialSeason * this.serialSeries * this.serialSeriesMinutes
            return this.getHoursAndMinutes(min)
        },
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
// Total time
.total-time
    margin-bottom 20px
.time-title
    display block
    margin-bottom 6px
.time-input
    max-width 80px
    margin-right 10px
// Tags
.tag-list
    margin-bottom 20px
.ui-tag__wrapper
    margin-right 18px
    margin-bottom 10px
    &:last  
        margin-right 0

.ui-tag
    .button-close
        &.active    
            transform rotate(45deg)
    &.used
        background-color #444ce0        
        color #fff
        .button-close
            &:before
            &:after
                background-color #fff
// Tag Menu Show
.tag-list--menu
  display flex
  justify-content space-between
  align-items center
// New Tag Input
.tag-add--input
  margin-bottom 0
  margin-right 10px
  height 42px

// Total Time
.total-time
  p
    margin-bottom 6px
  span
    margin-right 16px
  .task-input
    max-width 80px
    margin-bottom 28px
    margin-right 10px

.button-list
  display flex
  justify-content flex-end


</style>
