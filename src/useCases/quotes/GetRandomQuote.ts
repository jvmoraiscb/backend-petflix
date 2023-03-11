import { Quote } from '../../entities/Quote';

const Quotes: Quote[] = [
    {
        quote: 'Cinema is a mirror by which we often see ourselves.',
        author: 'Alejandro Gonzalez Inarritu'
    },
    {
        quote: 'Cinema is the most beautiful fraud in the world.',
        author: 'Jean-Luc Godard'
    },
    {
        quote: 'I think cinema, movies, and magic have always been closely associated. The very earliest people who made film were magicians.',
        author: 'Francis Ford Coppola'
    },
    {
        quote: 'I had a really hard time in Orange County. I was a nerd. I was watching foreign cinema when I was 13 and talking about how Hope and Glory should be a foreign film.',
        author: 'Pedro Pascal'
    },
    {
        quote: 'Everybody has something that chews them up and, for me, that thing was always loneliness. The cinema has the power to make you not feel lonely, even when you are.',
        author: 'Tom Hanks'
    },
    {
        quote: `Cinema is not only about making people dream. It's about changing things and making people think.`,
        author: `Nadine Labaki`
    },
    {
        quote: `Cinema is a matter of what's in the frame and what's out.`,
        author: `Martin Scorsese`
    },
    {
        quote: `Cinema can fill in the empty spaces of your life and your loneliness.`,
        author: `Pedro Almodovar`
    },
    {
        quote: `Every viewer is going to get a different thing. That's the thing about painting, photography, cinema.`,
        author: `David Lynch`
    },
    {
        quote: `For me, the cinema is not a slice of life, but a piece of cake.`,
        author: `Alfred Hitchcock`
    },
    {
        quote: `Cinema should make you forget you are sitting in a theater.`,
        author: `Roman Polanski`
    },
    {
        quote: `Photography is truth. The cinema is truth twenty-four times per second.`,
        author: `Jean-Luc Godard`
    },
    {
        quote: `I'm one of those people who says, 'yes, cinema died when they invented sound.'`,
        author: `George Lucas`
    },
    {
        quote: `Don't wake me for the end of the world unless it has very good special effects.`,
        author: `Roger Zelazny`
    },
    {
        quote: `Relating a person to the whole world: that is the meaning of cinema.`,
        author: `Andrei Tarkovsky`
    },
    {
        quote: `The saddest journey in the world is the one that follows a precise itinerary. Then you’re not a traveler. You're a f@@king tourist.`,
        author: `Guillermo del Toro`
    },
    {
        quote: `We don't make movies to make money, we make money to make more movies.`,
        author: `Walt Disney`
    },
    {
        quote: `For me, filmmaking combines everything. That's the reason I've made cinema my life's work. In films, painting and literature, theatre and music come together. But a film is still a film.`,
        author: `Akira Kurosawa`
    },
    {
        quote: `If a million people see my movie, I hope they see a million different movies.`,
        author: `Quentin Tarantino`
    },
    {
        quote: `A director must be a policeman, a midwife, a psychoanalyst, a sycophant and a bastard.`,
        author: `Billy Wilder`
    },
    {
        quote: `All I need to make a comedy is a park, a policeman and a pretty girl.`,
        author: `Charlie Chaplin`
    },
    {
        quote: `If My Film Makes One More Person Miserable, I've Done My Job.`,
        author: `Woody Allen`
    },
    {
        quote: `The first monster you have to scare the audience with is yourself.`,
        author: `Wes Craven`
    },
    {
        quote: `In film, we sculpt time, we sculpt behavior and we sculpt light.`,
        author: `David Fincher`
    },
    {
        quote: `You hear it said time and time again by successful directors: You have to make a movie for yourself. Don't make it for anyone else.`,
        author: `Jordan Peele`
    },
    {
        quote: `We need Storytelling. Otherwise, life just goes on and on like the number Pi.`,
        author: `Ang Lee`
    },
    {
        quote: `The lies are in the dialogue, the truth is in the visuals.`,
        author: `Kelly Reichardt`
    },
    {
        quote: `The university student's mistake is to think that everything will be fine in the final`,
        author: `Talles Cavalleiro`
    }
];

class GetRandomQuote {
    constructor() {}
    async execute(): Promise<Quote> {
        const index = Math.floor(Math.random() * Quotes.length);
        return Quotes[index];
    }
}

export { GetRandomQuote };
