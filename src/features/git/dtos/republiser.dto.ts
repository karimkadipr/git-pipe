import { IsOptional, Validate, IsArray, IsEnum } from 'class-validator';

import {
    IsRequired,
    IsCustomString,
    IsCustomUrl
} from '../../../shared/validators';

export default class RepubliserDTO {

    @IsCustomUrl()
    gitRepo: string
}