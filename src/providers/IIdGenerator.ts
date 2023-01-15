interface IIdGenerator {
    createId(): Promise<string>;
}

export { IIdGenerator };
