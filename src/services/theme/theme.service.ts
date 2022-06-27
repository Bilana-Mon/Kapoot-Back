import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Theme, Prisma } from '@prisma/client';

@Injectable()
export class ThemeService {
    constructor(private prisma: PrismaService) { }

    async theme(
        themeWhereUniqueInput: Prisma.ThemeWhereUniqueInput,
    ): Promise<Theme | null> {
        return this.prisma.theme.findUnique({
            where: themeWhereUniqueInput,
        });
    }

    async themes(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ThemeWhereUniqueInput;
        where?: Prisma.ThemeWhereInput;
        orderBy?: Prisma.ThemeOrderByWithRelationInput;
    }): Promise<Theme[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.theme.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createTheme(data: Prisma.ThemeCreateInput): Promise<Theme> {
        return this.prisma.theme.create({
            data,
        });
    }

    async updateTheme(params: {
        where: Prisma.ThemeWhereUniqueInput;
        data: Prisma.ThemeUpdateInput;
    }): Promise<Theme> {
        const { where, data } = params;
        return this.prisma.theme.update({
            data,
            where,
        });
    }

    async deleteTheme(where: Prisma.ThemeWhereUniqueInput): Promise<Theme> {
        return this.prisma.theme.delete({
            where,
        });
    }
}