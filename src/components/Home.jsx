import React, { useEffect, useContext } from 'react';
import { Container, Statistic, Divider, Header, Grid } from 'semantic-ui-react';
import NumberFormat from 'react-number-format';
import {
    ResponsiveContainer,
    Radar, 
    RadarChart, 
    PolarGrid, 
    PolarAngleAxis, 
    PolarRadiusAxis,
    Tooltip
} from 'recharts';

import StatsContext from '../context/stats/statsContext';

import Loader from '../components/layouts/loader/Loader';

const Home = () => {
    const statsContext = useContext(StatsContext);
    const { 
        getCountServerCharacters,
        getCountServerGroupByAssistances,
        getCountServerAssistances,
        getCountServerGroupByReports,
        getCountServerReports,
        total_characters,
        total_assistances,
        total_reports,
        group_by_assistances,
        group_by_reports,
        setLoading
    } = statsContext;

    useEffect(() => {
        getCountServerCharacters();
        getCountServerGroupByAssistances();
        getCountServerAssistances();
        getCountServerGroupByReports();
        getCountServerReports();
    }, []);

    return (
        <>
            <Container>
                <Statistic.Group size="small" widths="3">
                    <Statistic>
                        { total_characters !== null && !setLoading ? (
                            <Statistic.Value>
                                <NumberFormat value={total_characters} displayType={'text'} thousandSeparator={true} />
                            </Statistic.Value> ) : (<Loader isLoading={setLoading} />)
                        }
                        <Statistic.Label>Characters</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        { total_assistances !== null && !setLoading ? (
                            <Statistic.Value>
                                <NumberFormat value={total_assistances} displayType={'text'} thousandSeparator={true} />
                            </Statistic.Value> ) : (<Loader isLoading={setLoading} />)
                        }
                        <Statistic.Label>Total Assistance</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        { total_reports !== null && !setLoading ? (
                            <Statistic.Value>
                                <NumberFormat value={total_reports} displayType={'text'} thousandSeparator={true} />
                            </Statistic.Value> ) : (<Loader isLoading={setLoading} />)
                        }
                        <Statistic.Label>Total Report</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
                <Divider hidden />
                <Grid columns={2} stackable>
                    <Grid.Column>
                        <ResponsiveContainer>
                            { group_by_assistances !== null && !setLoading ? (<>
                                <Header as="h3">Most Handled Assistance</Header>
                                <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={group_by_assistances}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="handler" />
                                    <PolarRadiusAxis />
                                    <Tooltip />
                                    <Radar name="total handle" dataKey="count_handler" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                </RadarChart>
                            </>) : (<Loader isLoading={setLoading} />)}
                        </ResponsiveContainer>
                    </Grid.Column>
                    <Grid.Column>
                        <ResponsiveContainer>
                            { group_by_reports !== null && !setLoading ? (<>
                                <Header as="h3">Most Handled Report</Header>
                                <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={group_by_reports}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="handler" />
                                    <PolarRadiusAxis />
                                    <Tooltip />
                                    <Radar name="total handle" dataKey="count_handler" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6}/>
                                </RadarChart>
                            </>) : (<Loader isLoading={setLoading} />)}
                        </ResponsiveContainer>
                    </Grid.Column>
                </Grid>
            </Container>
        </>
    )
}

export default Home;
