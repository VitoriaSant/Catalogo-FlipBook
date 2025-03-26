<template>
    <div id="tabela">
        <v-table>
            <thead>
                <tr>
                    <th class="text-center">Mostruários</th>
                    
                </tr>
            </thead>
            <tbody>
                <tr v-for="(catalogo, id) in filtroMostruarios" :key="id">
                    <td>
                    <v-btn @click="console.log(catalogo.catalogo)">  
                        {{catalogo.catalogo }} - {{ catalogo.descricaoCatalago }}
                    </v-btn> 
                    </td>

                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script lang="ts" setup>
import { Catalogo} from '@/classes/Catalogo'

const props = defineProps<{ catalogos: Catalogo[] }>()
const filtroMostruarios = ref<Catalogo[]>(props.catalogos)

</script>
<style>
#tabela { 
    
    padding: 40px;
    border-radius: 10px;}
</style>