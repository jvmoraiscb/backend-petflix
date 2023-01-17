# petfilmes

Back-end do Pet Filmes

npx prisma migrate dev

        /////////////////////////////////////////////////////////////////////////////////////
        // existe uma chance infinitamente pequena de se gerar um id não único... mas existe!
        let id: string
        let idAlreadyExists: User | null
        do {
            id = await this.idGenerator.createId()
            idAlreadyExists = await this.usersRepository.findById(id)
        } while (idAlreadyExists !== null)
        /////////////////////////////////////////////////////////////////////////////////////
