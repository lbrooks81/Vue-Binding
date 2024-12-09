const posts =
[
    {
        id: 1,
        title: "My First Post",
        body: "This is my <strong>first</strong> post, please true react"
    },
    {
        id: 2,
        title: "The Frog's Grand Plan",
        body: "Eat da bug"
    },
    {
        id: 3,
        title: "I go home",
        body: "<i>sleepy</i> time :)"
    }
];


const app = Vue.createApp({
    async created(){
        await this.getPosts();
    },
    data() {
        return {
            //* This property cannot be accessed outside where it is mounted


            //* Shorthand property syntax only works if the property's value is a variable with the same name
            posts,
            darkModeSet: true,
            darkMode: {
                //* These need to match the style properties that you would set through JS
                backgroundColor: "#38383A",
                color: "whitesmoke"
            },
            baseStyle: {
                fontFamily: "monospace",
            }
        }
    },
    methods: {
        toggleDarkMode(){
            //* "this" refers to the Vue instance
            this.darkModeSet = !this.darkModeSet;
        },
        async getPosts(){
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            //* This works because the data returned from the API is structured the same way as our posts array
            this.posts = await response.json();
        }
    }
});

app.component('app-header', {
    data(){
        return{
            name: "Logan Brooks",
            links: ["home", "portfolio", "contact me"],
        }
    },
    template: `<header>
                    <h1> {{ name }}'s Blog</h1>
                    <nav>
                        <ul>
                            <!-- v-for just acts as a foreach loop -->
                            <li v-for="link in links">
                                <a href="#" v-text="link"></a>
                            </li>
                        </ul>
                    </nav>
                </header>`
});

app.component('blog-post', {
    props: ['post'],
    template: `<!-- v-bind prevents HTML from using post.id as a string value -->
               <!-- removing v-bind and just having :post.id is shorthand and is preferred -->
                <article>
                  <h3>{{post.title}}</h3>
                  <!-- v-html renders the text as HTML -->
                  <!-- NEVER use this directive with input from an end-user -->
                  <p v-html="post.body"></p>
                  <p class="read-more">Read more</p>
                </article>`
});

app.mount("body");

