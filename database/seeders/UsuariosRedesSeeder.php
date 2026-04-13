<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsuariosRedesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::updateOrCreate(
            ['email' => 'lalvarez@vit.gob.ve'],
            [
                'name' => 'Luis',
                'username' => 'luis',
                'password' => bcrypt('1234'),
            ]
        );

        \App\Models\User::updateOrCreate(
            ['email' => 'alnardo@vit.gob.ve'],
            [
                'name' => 'Alnardo',
                'username' => 'alnardo',
                'password' => bcrypt('1234'),
            ]
        );

        \App\Models\User::updateOrCreate(
            ['email' => 'victor@vit.gob.ve'],
            [
                'name' => 'Victor',
                'username' => 'victor',
                'password' => bcrypt('1234'),
            ]
        );

        \App\Models\User::updateOrCreate(
            ['email' => 'ltimaure@vit.gob.ve'],
            [
                'name' => 'Luis Timaure',
                'username' => 'ltimaure',
                'password' => bcrypt('1234'),
            ]
        );
    }
}
