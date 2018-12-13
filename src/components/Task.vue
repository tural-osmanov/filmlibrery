<template lang="pug">
    .content-wrapper
        section 
            .container
                h1.ui-title-1 Tasks
                .task-list
                    .task-item(
                        v-for="task in tasks"
                        :key="task.id"
                        :class="{ completed: task.comleted }"
                    )
                        .ui-card.ui-card--shadow
                            .task-item__info
                                .task-item__main-info 
                                    span.ui-label.ui-label--light {{task.whatWhatch}}
                                    span Total Time {{ task.time }}
                                span.button-close
                            .task-item__content
                                .task-item__header
                                    .ui-checkbox-wrapper
                                        input.ui-checkbox(
                                            type='checkbox'
                                            v-model="task.comleted"
                                        )
                                    span.ui-title-3 {{ task.title }}
                                .task-item__body
                                    p.ui-text-regular {{ task.descriotion }}
                                .item__footer
                                    .tag-list
                                        .ui-tag__wrapper(
                                            v-for="tag in task.tags"
                                            :key="tag.title"
                                        )
                                            .ui-tag
                                                span.tag-title {{ tag.title }}
</template>

<script>
export default {
    computed: {
        tasks () {
            return this.$store.getters.tasks
        }
    }
}
</script>


<style lang="stylus" scoped>
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
.ui-label
    margin-right 8px
</style>
